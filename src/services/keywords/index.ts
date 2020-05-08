import authenticatedAxios from '../authenticatedAxios';

export function getAllKeywords(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    authenticatedAxios
      .get<string[]>('/keywords')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getKeywordLike(phrase: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    authenticatedAxios
      .get<string[]>(`/keywords/${phrase}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
