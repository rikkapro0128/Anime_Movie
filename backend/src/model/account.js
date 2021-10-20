import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create Schema
const account = new Schema({
  name: { type: String, required: true },
  email: { type: String, default: '', required: true, },
  type: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  authType: { type: String, enum: ['local', 'facebook', 'google'], default: 'local' },
  hashPassword: { type: String, required: function() { return this.authType === 'local' } },
  idFaceBook: { type: String, required: function() { return this.authType === 'facebook' } },
  idGoogle: { type: String, required: function() { return this.authType === 'google' } },
  loved: { type: String, enum: ['Có', 'Chưa'], default: 'Chưa' },
  gender: { type: String, enum: ['Nam', 'Nữ'], default: 'Nam' },
  phone: { type: String, default: '000-000-000' },
  refToken: { type: Array, default: [] },
  followMovie: { type: Array, default: [] },
  createAt: { type: Date, default: Date.now() },
});

// create models
const AccountModel = mongoose.model('account', account);

export { 
    AccountModel,
};
