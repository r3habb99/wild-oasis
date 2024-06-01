import { handleError } from '../utils/errorHandler';
import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: '' },
    },
  });
  handleError(error, 'Sign Up');
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  handleError(error, 'Login');
  return data;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  handleError(sessionError, 'Get Session');

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();
  handleError(error, 'Get User');
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  handleError(error, 'Logout');
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  handleError(error, 'Update User');

  if (!avatar) return data;

  const fileName = `avatar=${data.user.id}-${new Date().toISOString()}`;
  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);
  handleError(storageError, 'Upload Avatar');

  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: updatedError } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });
  handleError(updatedError, 'Update User with Avatar');
  
  return updatedUser;
}
