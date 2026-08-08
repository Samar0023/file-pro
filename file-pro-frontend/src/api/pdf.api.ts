import api from "./axios";

export const createPdf = async (fileIds: string[]) => {
  const res = await api.post("/pdf/create-pdf", { fileIds });
  return res.data;
};

export const mergePdf = async (fileIds: string[]) => {
  const res = await api.post("/pdf/merge-pdf", { fileIds });
  return res.data;
};

export const splitPdf = async (id: string) => {
  const res = await api.post(`/pdf/split-pdf/${id}`);
  return res.data;
};