import { trelloAuthorizeUrl } from "@jac-chart/importers";
import { trelloApiKeyFromEnv } from "../source/trello-api-key";

function getTrelloAuthorizeUrl() {
  const apiKey = trelloApiKeyFromEnv();
  return { authorizeUrl: apiKey ? trelloAuthorizeUrl(apiKey) : null };
}

export default getTrelloAuthorizeUrl;
