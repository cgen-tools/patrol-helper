import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import PatrolForm from "./components/PatrolForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <PatrolForm />
    </MantineProvider>
  </StrictMode>,
);
