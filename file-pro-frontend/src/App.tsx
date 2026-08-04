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
import CompressImage from "./pages/Images/CompressImage";
import ResizeImage from "./pages/Images/ResizeImage";
import ConvertImage from "./pages/Images/ConvertImage";
function App() {
  return (
    <BrowserRouter>
      <Routes>



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

      

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

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
        />

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
          path="/images/compress"
          element={
            <ProtectedRoute>
              <CompressImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/resize"
          element={
            <ProtectedRoute>
              <ResizeImage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/convert"
          element={
            <ProtectedRoute>
              <ConvertImage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;