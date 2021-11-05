<template>
  <div class="detail-ani">
    <h1 class="">
      <router-link class="tl-ani tl-ani-hov" to="/admin/danh-sach-anime"
        >Danh Sách Anime</router-link
      >
      / <span class="tl-ani">{{ detailAnimeData.name }}</span>
    </h1>
    <div class="detail-ani__name">
      <input
        class="box-sd"
        type="text"
        v-model="detailAnimeData.name"
        :readonly="!state.editName"
      />
      <div
        v-if="!state.editName"
        class="overlay"
        @click="state.editName = true"
      >
        <span>Chỉnh sửa tên</span>
      </div>
      <button
        class="btn box-sd"
        @click="saveInfo(detailAnimeData.name, 'name')"
        v-else
      >
        Lưu
      </button>
    </div>
    <div class="detail-ani__wrap">
      <div class="detail-ani__wrap--img box-sd">
        <img
          v-if="imageLink"
          :src="`${host}${imageLink}`"
          :alt="detailAnimeData.name"
        />
        <img v-if="imageLocal" :src="imageLocal" :alt="'load'" />
        <div class="no-img" @mouseenter="changeText" @mouseleave="changeText">
          <span v-if="!textImage.state">{{
            !detailAnimeData.image && !imageLocal
              ? "Không có ảnh!"
              : "Thay đổi!"
          }}</span>
          <span v-else>{{ textImage.message }}</span>
          <label for="load-image"></label>
          <input
            type="file"
            id="load-image"
            accept="image/*"
            :multiple="false"
            hidden
            @change="getFileImage($event)"
          />
        </div>
        <span v-if="stateButtonSaveImage" @click="sendImage()">Lưu ảnh</span>
      </div>
      <div class="detail-ani__wrap--desc box-sd">
        <span>Mô tả</span>
        <textarea
          v-model="detailAnimeData.desc"
          :readonly="!state.editDesc"
          spellcheck="false"
        ></textarea>
        <div
          v-if="!state.editDesc"
          @click="state.editDesc = true"
          class="overlay"
        >
          <span>Chỉnh sửa mô tả!</span>
        </div>
        <button
          v-else
          @click="saveInfo(detailAnimeData.desc, 'desc')"
          class="btn"
        >
          Lưu
        </button>
      </div>
    </div>
    <div class="detail-ani__options">
      <div class="detail-ani__options--show-times">
        <h1>lịch chiếu:</h1>
        <div>
          <span>mỗi: </span>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="date"
						:stateSelect="false"
            order="4"
            field="date"
            :name="'chọn thứ'"
            :dataSelect="[
              'thứ 2',
              'thứ 3',
              'thứ 4',
              'thứ 5',
              'thứ 6',
              'thứ 7',
              'chủ nhật',
            ]"
            @changeSelect="getValueSelect"
          />
          <span>hàng: </span>
          <Select
						@selectFieldActive="handleSelectAll"
						ref="loop"
						:stateSelect="false"
            order="4"
            field="loop"
            :name="'chọn phiên lặp'"
            :dataSelect="['tuần', 'tháng', 'năm']"
            @changeSelect="getValueSelect"
          />
        </div>
      </div>
			<div class="wrap--select">
				<div class="wrap--select__options--show-state">
					<h1>trạng thái:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="state-movie"
						:stateSelect="false"
						order="3"
						field="state-movie"
						:name="'tuỳ chọn'"
						:dataSelect="['hoàn tất', 'đang cập nhật']"
						@changeSelect="getValueSelect"
					/>
				</div>
				<div class="wrap--select__options--nation">
					<h1>quốc gia:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="nation"
						:stateSelect="false"
						order="3"
						field="nation"
						:name="'tuỳ chọn'"
						:dataSelect="['nhật bản', 'trung quốc', 'hàn quốc']"
						@changeSelect="getValueSelect"
					/>
				</div>
				<div class="wrap--select__options--quality">
					<h1>chất lượng:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="quality"
						:stateSelect="false"
						order="3"
						field="quality"
						:name="'tuỳ chọn'"
						:dataSelect="['360p', '480p', '720p', '1080p']"
						@changeSelect="getValueSelect"
					/>
				</div>
				<div class="wrap--select__options--time-esp">
					<h1>thời lượng:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="time"
						:stateSelect="false"
						order="3"
						field="time"
						:name="'tuỳ chọn'"
						:dataSelect="[12, 24]"
						@changeSelect="getValueSelect"
					/>
				</div>
				<div class="wrap--select__options--season">
					<h1>season:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="season"
						:stateSelect="false"
						order="3"
						field="season"
						:name="'tuỳ chọn'"
						:dataSelect="['mùa xuân', 'mùa hạ', 'mùa thu', 'mùa đông']"
						@changeSelect="getValueSelect"
					/>
				</div>
				<div class="wrap--select__options--translate">
					<h1>loại translate:</h1>
					<Select
						@selectFieldActive="handleSelectAll"
						ref="translate"
						:stateSelect="false"
						order="3"
						field="translate"
						:name="'tuỳ chọn'"
						:dataSelect="['vietsub', 'lồng tiếng']"
						@changeSelect="getValueSelect"
					/>
				</div>
			</div>
      <div class="detail-ani__options--genre">
        <h1>thể loại:</h1>
        <div class="detail-ani__options--genre--wraps">
          <Checkbox
            v-for="(genre, index) in genres"
            :key="index"
            :name="genre.field"
            :value="genre.value"
            :checkboxPos="index"
            @ChangeCheckBox="getValuecheckBox"
          />
        </div>
      </div>
      <div class="detail-ani__options--author">
        <h1>tác giả:</h1>
        <Input
          type="text"
          :setTitle="false"
          name="author"
          placeholder="tên tác giả..."
          @changeValueInput="getValueInput"
        />
      </div>
      <div class="detail-ani__options--studio">
        <h1>studio:</h1>
        <Input
          type="text"
          :setTitle="false"
          name="studio"
          placeholder="studio thực hiện..."
          @changeValueInput="getValueInput"
        />
      </div>
    </div>
    <div class="detail-ani__add-movie">
      <h1>
        Để thêm video Admin vui lòng thêm video vào thư mục
        <span>"{{ pathDirStorage.split("\\\\").join("\\") }}"</span>
      </h1>
      <input
        type="file"
        ref="inputPathFileVideo"
        accept="video/*"
        multiple
        @change="getPathFile($event, 'file')"
        hidden
      />
      <input
        type="file"
        ref="inputPathDirVideo"
        accept="video/*"
        webkitdirectory
        directory
        multiple
        @change="getPathFile($event, 'dir')"
        hidden
      />
      <button class="btn box-sd" @click="$refs.inputPathFileVideo.click()">
        Thêm video
      </button>
      <span>Hoặc</span>
      <button class="btn box-sd" @click="$refs.inputPathDirVideo.click()">
        Thư mục chứa video
      </button>
    </div>
    <table>
      <tr>
        <th>STT</th>
        <th>Thời gian đăng</th>
        <th>Tập</th>
        <th>Xoá</th>
      </tr>
      <tr v-for="(video, index) in detailAnimeData.videos" :key="index">
        <td>{{ index }}</td>
        <td>{{ moment(video.createdAt).format("LLL") }}</td>
        <td>{{ video.esp }}</td>
        <td
          class="hov-remove"
          :id_video="video._id"
          @click="removeVideo(video.esp, video._id)"
        >
          <i class="far fa-trash-alt"></i>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { capitalize, capitalizeFirstLetter } from "../utils/common.js";
import Select from "../components/Select.vue";
import Input from "../components/Input_2.vue";
import Checkbox from "../components/Checkbox.vue";
import moment from "moment";
import "moment/locale/vi";

export default {
  name: "Detail Anime",
  components: { Select, Checkbox, Input },
  setup() {
    const route = useRoute();
    const store = useStore();
    const demo = ref(0);
    const stateButtonSaveImage = ref(false);
    const imageLocal = ref("");
    const labelAnime = ref(route.params.label_anime);
    const detailAnimeData = ref({});
    const fileImage = ref({});
    const pathDirStorage = ref("");
    const nameVideo = ref(null);
    const imageLink = ref("");
    const manageSelect = reactive([
			'date',
			'loop',
      'state-movie',
      'time',
      'season',
      'translate',
      'quality',
      'nation',
    ]);
    const genres = reactive([
      {
        field: "Action",
        value: false,
      },
      {
        field: "Adventure",
        value: false,
      },
      {
        field: "Cartoon",
        value: false,
      },
      {
        field: "Comedy",
        value: false,
      },
      {
        field: "Dementia",
        value: false,
      },
      {
        field: "Demons",
        value: false,
      },
      {
        field: "Drama",
        value: false,
      },
      {
        field: "Ecchi",
        value: false,
      },
      {
        field: "Fantasy",
        value: false,
      },
      {
        field: "Game",
        value: false,
      },
      {
        field: "Harem",
        value: false,
      },
      {
        field: "Historical",
        value: false,
      },
      {
        field: "Horror",
        value: false,
      },
      {
        field: "Josei",
        value: false,
      },
      {
        field: "Kids",
        value: false,
      },
      {
        field: "Live Action",
        value: false,
      },
      {
        field: "Magic",
        value: false,
      },
      {
        field: "Martial Arts",
        value: false,
      },
      {
        field: "Mecha",
        value: false,
      },
      {
        field: "Military",
        value: false,
      },
      {
        field: "Music",
        value: false,
      },
      {
        field: "Mystery",
        value: false,
      },
      {
        field: "Parody",
        value: false,
      },
      {
        field: "Police",
        value: false,
      },
      {
        field: "Psychological",
        value: false,
      },
      {
        field: "Romance",
        value: false,
      },
      {
        field: "Samurai",
        value: false,
      },
      {
        field: "School",
        value: false,
      },
      {
        field: "Sci-Fi",
        value: false,
      },
      {
        field: "Seinen",
        value: false,
      },
      {
        field: "Shoujo",
        value: false,
      },
      {
        field: "Shoujo Ai",
        value: false,
      },
      {
        field: "Shounen",
        value: false,
      },
      {
        field: "Shounen Ai",
        value: false,
      },
      {
        field: "Slice of Life",
        value: false,
      },
      {
        field: "Space",
        value: false,
      },
      {
        field: "Sports",
        value: false,
      },
      {
        field: "Super Power",
        value: false,
      },
      {
        field: "Supernatural",
        value: false,
      },
      {
        field: "Thriller",
        value: false,
      },
      {
        field: "Tokusatsu",
        value: false,
      },
      {
        field: "Vampire",
        value: false,
      },
      {
        field: "Yaoi",
        value: false,
      },
      {
        field: "Yuri",
        value: false,
      },
    ]);
    const host = ref(process.env.VUE_APP_HOST_SERVER);
    const textImage = reactive({
      message: "Tải ảnh",
      state: false,
    });
    const state = reactive({
      editDesc: false,
      editName: false,
    });
    (async () => {
      await store.dispatch("getMovieByLabel", {
        label: labelAnime.value,
        options: { esp: "all" },
      });
      pathDirStorage.value = await store.dispatch("getPathDirStorage");
      detailAnimeData.value = store.state.movie;
      imageLink.value = detailAnimeData.value.image;
    })();
    return {
      demo,
      host,
      store,
      state,
      genres,
      moment,
      imageLink,
      fileImage,
      nameVideo,
      textImage,
      imageLocal,
      labelAnime,
      manageSelect,
      pathDirStorage,
      detailAnimeData,
      stateButtonSaveImage,
    };
  },
  methods: {
    getValuecheckBox(content) {
      console.log(content);
    },
    getValueSelect(content) {
      console.log(content);
    },
    getValueInput(content) {
      console.log(content);
    },
    changeText() {
      this.textImage.state = !this.textImage.state;
    },
    getFileImage(event) {
      this.fileImage = event.target.files[0];
      this.imageLocal = URL.createObjectURL(event.target.files[0]);
      this.imageLink = "";
      this.stateButtonSaveImage = true;
    },
    async sendImage() {
      const state = await this.$store.dispatch("sendImage", {
        fieldImage: "image",
        url: `admin/up-img-mv/options?label_ani=${this.labelAnime}`,
        file: this.fileImage,
      });
      if (state) {
        this.imageLocal = "";
        await this.reLoadData();
        this.stateButtonSaveImage = !this.stateButtonSaveImage;
      }
    },
    async getPathFile(event, type) {
      const arrayPath = [];
      for (const file of event.target.files) {
        arrayPath.push(type === "file" ? file.name : file.webkitRelativePath);
      }
      const state = await this.$store.dispatch("sendNameVideo", {
        url: `admin/post-video?label_ani=${this.labelAnime}`,
        pathVideo: arrayPath,
      });
			console.log(arrayPath)
      event.target.value = null;
      if (state) {
        this.reLoadData();
      }
    },
    async removeVideo(esp, id_esp) {
      const result = await this.$store.dispatch("removeVideoByLabel", {
        label: this.labelAnime,
        options: { esp: esp, id_esp: id_esp },
      });
      if (result) {
        this.reLoadData();
      }
    },
    async saveInfo(value, type) {
      if (type === "name") {
        value = capitalize(value).trim();
        this.state.editName = false;
      } else if (type === "desc") {
        value = capitalizeFirstLetter(value).trim();
        this.state.editDesc = false;
      }
      const label = await this.$store.dispatch("updateMovie", {
        label: this.labelAnime,
        options: { data: value, type },
      });
      if (label) {
        this.labelAnime = label;
        this.reLoadData();
      }
    },
    async reLoadData() {
      await this.$store.dispatch("getMovieByLabel", {
        label: this.labelAnime,
        options: { esp: "all" },
      });
      this.detailAnimeData = this.store.state.movie;
      //console.log(this.store.state.movie);
      this.imageLink = `${this.detailAnimeData.image}?${Date.now()}`;
    },
		handleSelectAll(field) {
			// this.manageSelect.forEach((item) => {
			// 	if(item !== field) {
			// 		this.$refs[item].stateOpenSelect = false;
			// 	}
			// })
			console.log(this.$refs[field])
		}
  },
};
</script>

<style lang="scss" scoped>
.detail-ani {
  padding: 0.4rem;
  &__name {
    position: relative;
    input {
      width: 100%;
      display: block;
      font-size: 1.4rem;
      color: $base-color;
      margin: 0.8rem 0;
      outline: none;
      padding: 0.5rem;
      border-radius: 10px;
      border: 2px solid $main-color;
      box-sizing: border-box;
    }
    .overlay {
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: calc(1.4rem + 2 * 0.5rem + 8px);
      border-radius: 10px;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      span {
        font-size: 1.2rem;
        color: transparent;
        font-style: italic;
        font-weight: 600;
      }
      &:hover {
        background-color: $base-color;
        span {
          color: #fff;
        }
      }
    }
    button {
      position: absolute;
      top: 50%;
      right: 0.1rem;
      transform: translateY(-50%) scale(0.8);
      font-size: 1.4rem;
      padding: 0.4rem 0.8rem;
    }
  }
  &__wrap {
    display: flex;
    width: 100%;
    &--img {
      min-width: 10rem;
      height: 12rem;
      border: 2px solid $main-color;
      border-radius: 10px;
      background-color: #fff;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        transition: background-color 0.2s ease-in-out;
        span {
          display: block;
          font-size: 1.2rem;
          color: $main-color;
        }
        label {
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        & + span {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 0.5rem;
          background-color: rgba(255, 255, 255, 0.925);
          border-radius: 10px;
          margin-bottom: 0.4rem;
          margin-right: 0.4rem;
          color: $main-color;
          border: 2px solid $main-color;
          transition: transform 0.1s ease-in-out;
          &:active {
            transform: scale(0.95);
          }
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.479);
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &--desc {
      margin-left: 1rem;
      border: 2px solid $main-color;
      border-radius: 10px;
      background-color: #fff;
      padding: 0.8rem;
      width: inherit;
      position: relative;
      span:first-child {
        display: block;
        color: $base-color;
        font-size: 1.2rem;
        font-style: italic;
        font-weight: 600;
      }
      textarea {
        display: block;
        color: $base-color;
        margin-top: 0.6rem;
        width: 100%;
        height: calc(100% - (1.2rem + 0.6rem));
        padding: 0.5rem;
        box-sizing: border-box;
        resize: none;
        outline: none;
        border: 2px solid $base-color;
        border-radius: 10px;
        font-size: 1rem;
      }
      div {
        position: absolute;
        bottom: 0.8rem;
        width: calc(100% - 2 * 0.8rem);
        height: calc(100% - (1.2rem + 0.6rem + 2 * 0.8rem));
        box-sizing: border-box;
        border-radius: 10px;
        &.overlay {
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: transparent;
          }
          &:hover {
            background-color: $base-color;
            span {
              color: #fff;
            }
          }
        }
      }
      button {
        position: absolute;
        right: 0.5rem;
        top: -0.2rem;
        transform: scale(0.8);
        font-size: 1.4rem;
        padding: 0.4rem 0.8rem;
      }
    }
  }
  &__options {
    width: 100%;
    background-color: $light;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid $main-color;
    margin-top: 1rem;
		.wrap--select {
			display: flex;
			flex-wrap: wrap;
			&__options--show-state {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
			&__options--quality {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
			&__options--season {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
			&__options--translate {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
			&__options--time-esp {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
			&__options--nation {
				display: flex;
				align-items: center;
				h1 {
					text-transform: capitalize;
				}
			}
		}
    &--show-times {
      h1 {
        font-size: 1.2rem;
        text-transform: capitalize;
      }
      div {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        margin-left: 1rem;
        span {
          text-transform: capitalize;
        }
      }
    }
    &--genre {
      display: flex;
      align-items: center;
      h1 {
        text-transform: capitalize;
        white-space: nowrap;
      }
      &--wraps {
        display: flex;
        margin-left: 1rem;
        flex-wrap: wrap;
      }
    }
    &--author {
      display: flex;
      align-items: center;
      h1 {
        text-transform: capitalize;
        white-space: nowrap;
      }
    }
    &--studio {
      display: flex;
      align-items: center;
      h1 {
        text-transform: capitalize;
        white-space: nowrap;
      }
    }
  }
  &__add-movie {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8rem;
    align-items: center;
    color: #000;
    h1 {
      margin-right: 1rem;
      color: inherit;
      white-space: nowrap;
    }
    & > span {
      display: block;
      margin: 0 1rem;
      color: inherit;
    }
  }
}
</style>
