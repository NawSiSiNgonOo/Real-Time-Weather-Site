export const getLocationError = (error: GeolocationPositionError) => {
  switch (error.code) {
    case 1:
      console.error("Geolocation error: Permission denied", error.message);
      break;
    case 2:
      console.error("Geolocation error: Position unavailable", error.message);
      break;
    case 3:
      console.error("Geolocation error: Timeout", error.message);
      break;
    default:
      console.error("An unexpected error occurred:", error.message);
  }
};

export const getFetchError = (error: unknown) => {
  if (error instanceof Error && "status" in error) {
    switch (error.status) {
      case 400:
        console.error(
          "Bad Request: The server could not understand the request.",
          error.message
        );
        break;
      case 401:
        console.error(
          "Unauthorized: Authentication is required.",
          error.message
        );
        break;
      case 404:
        console.error(
          "Not Found: The requested resource was not found.",
          error.message
        );
        break;
      case 500:
        console.error(
          "Server Error: The server encountered an error.",
          error.message
        );
        break;
      default:
        console.error("Unknown Fetch Error:", error.message);
    }
  }
};
