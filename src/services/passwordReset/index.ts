import authenticatedAxios from '../authenticatedAxios';

export function resetPassword(
  userId: string,
  key1: string,
  key2: string,
  newPassword: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    authenticatedAxios
      .post(`/auth/password-reset/${userId}/${key1}/${key2}`, {
        password: newPassword,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
