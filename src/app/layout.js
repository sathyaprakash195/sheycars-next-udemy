import LayoutProvider from "@/components/LayoutProvider";
import "./globals.css";
import "@/stylessheets/commonClasses.css";
import "@/stylessheets/customClasses.css";
import ReduxStoreProvider from "@/components/ReduxStoreProvider";

export const metadata = {
  title: "SheyCars - Udemy",
  description: "A Car Rental App",
};

export default function RootLayout({ children }) {
  return (
    <ReduxStoreProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ReduxStoreProvider>
  );
}
