import { useCallback, useContext } from "react";
import { ethers } from 'ethers';
import RSS3 from "rss3";

import { UserContext } from "../providers/User";
import { RSS3_ENDPOINT_URL } from "../constants";

declare var window: any;

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (! userContext) {
    throw new Error('Using user context ouside the provider.');
  }

  const { state, dispatch } = userContext;

  const authenticate = useCallback(async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const sign = async (data: any) => await signer.signMessage(data);
  
      const rss3 = new RSS3({ endpoint: RSS3_ENDPOINT_URL, address, sign });
      const profileInfo = await rss3.profile.get(address);

      const profile = {
        address,
        name: profileInfo.name,
        avatar: 'https://infura-ipfs.io/ipfs/QmcK8FSTtLQVydLEDKLv1hEacLxZgi7j2i4mkQQMyKxv6k',
      };
      dispatch({ type: 'set_rss3', rss3, profile });
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  return { ...state, authenticate };
};
