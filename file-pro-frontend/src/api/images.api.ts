import api from "./axios";

export const resizeImage = async (id: string, width: number, height: number) => {
  const res = await api.post(`/images/resize/${id}`, { width, height });
  return res.data;
};

export const cropImage = async (
  id: string,
  width: number,
  height: number,
  top: number,
  left: number
) => {
  const res = await api.post(`/images/crop/${id}`, { width, height, top, left });
  return res.data;
};

export const rotateImage = async (id: string, rotation: number) => {
  const res = await api.post(`/images/rotate/${id}`, { rotation });
  return res.data;
};

export const grayscaleImage = async (id: string) => {
  const res = await api.post(`/images/grayscale/${id}`);
  return res.data;
};

export const compositeImage = async (id: string, overlayId: string) => {
  const res = await api.post(`/images/watermark/${id}/${overlayId}`);
  return res.data;
};