import api from "./axios";

export interface FileData {
  id: string;
  title: string;
  description: string;
  OriginalName: string;
  fileName: string;
  fileUrl: string;
  publicId: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export const uploadFile = async (data: FormData) => {
  const res = await api.post("/files/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllFiles = async () => {
  const res = await api.get("/files/allfiles");
  return res.data;
};

export const getFileById = async (id: string) => {
  const res = await api.get(`/files/${id}`);
  return res.data;
};

export const deleteFile = async (id: string) => {
  const res = await api.post(`/files/delete/${id}`);
  return res.data;
};

export const downloadFile = async (id: string) => {
  const res = await api.get(`/files/download/${id}`, {
    responseType: "blob",
  });
  return res.data;
};