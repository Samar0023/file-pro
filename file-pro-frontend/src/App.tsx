import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Landing from "./pages/Landing/Landing";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Dashboard from "./pages/Dashboard/Dashboard";

import Upload from "./pages/Upload/Upload";

import MyFiles from "./pages/Files/MyFiles";
import FileDetails from "./pages/Files/FileDetails";

import PdfDashboard from "./pages/PDF/PdfDashboard";
import CreatePdf from "./pages/PDF/CreatePdf";
import MergePdf from "./pages/PDF/MergePdf";
import SplitPdf from "./pages/PDF/SplitPdf";

import ImageDashboard from "./pages/Images/ImageDashboard";
import AllImages from "./pages/Images/AllImages";
import ImageDetails from "./pages/Images/ImageDetails";
import ResizeImage from "./pages/Images/ResizeImage";
import CropImage from "./pages/Images/CropImage";
import RotateImage from "./pages/Images/RotateImage";
import GrayScaleImage from "./pages/Images/GrayScaleImage";
import CompositeImage from "./pages/Images/CompositeImage";
import CompressImage from "./pages/Images/CompressImage";
import ConvertImage from "./pages/Images/ConvertImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Upload */}

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* Files */}

        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <MyFiles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/files/:id"
          element={
            <ProtectedRoute>
              <FileDetails />
            </ProtectedRoute>
          }
        />

        {/* PDF */}

        <Route
          path="/pdf"
          element={
            <ProtectedRoute>
              <PdfDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf/create"
          element={
            <ProtectedRoute>
              <CreatePdf />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf/merge"
          element={
            <ProtectedRoute>
              <MergePdf />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf/split"
          element={
            <ProtectedRoute>
              <SplitPdf />
            </ProtectedRoute>
          }
        />        {/* Images */}

        <Route
          path="/images"
          element={
            <ProtectedRoute>
              <ImageDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/all"
          element={
            <ProtectedRoute>
              <AllImages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/:id"
          element={
            <ProtectedRoute>
              <ImageDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/resize/:id"
          element={
            <ProtectedRoute>
              <ResizeImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/crop/:id"
          element={
            <ProtectedRoute>
              <CropImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/rotate/:id"
          element={
            <ProtectedRoute>
              <RotateImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/grayscale/:id"
          element={
            <ProtectedRoute>
              <GrayScaleImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/composite/:id"
          element={
            <ProtectedRoute>
              <CompositeImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/compress/:id"
          element={
            <ProtectedRoute>
              <CompressImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/convert/:id"
          element={
            <ProtectedRoute>
              <ConvertImage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
              <div className="text-center">
                <h1 className="text-6xl font-black">404</h1>
                <p className="mt-4 text-zinc-400">
                  Page not found.
                </p>

                <a
                  href="/"
                  className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
                >
                  Go Home
                </a>
              </div>
            </main>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;