import toast from "react-hot-toast";

async function appFetch(route: string, options?: RequestInit) {
  try {
    console.log("Fetching data for route:", route);
    const response = await fetch(route, {
      ...options,
      credentials: "include",
    });

    if (response.status === 429) {
      toast.error("Trop de requêtes, veuillez réessayer plus tard");
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (response.status === 403) {
      return { unauthorized: true };
    }
    if (response.ok) {
      if (contentType && contentType.indexOf("application/pdf") !== -1) {
        return await response.blob();
      } else {
        // Traitez la réponse comme du JSON
        const responseData = await response.json();
        return responseData;
      }
    } else {
      // Si la réponse n'est pas OK, traitez toujours comme du JSON pour obtenir le message d'erreur
      const responseData = await response.json();
      console.error("Failed to fetch data for route:", route);
      console.error("Error message:", responseData);
      toast.error(responseData.message);
      return null;
    }
  } catch (error) {
    console.log(error);
    toast.error("Une erreur est survenue");

    return null;
  }
}

export default appFetch;
