import { useLoadScript } from "@react-google-maps/api";
import Header from "./components/Header";


export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env?.REACT_APP_GOOGLE_MAP_API_KEY || '' // Add your API key
  });

  return isLoaded ? (
    <Header/>
  ) : null;
}