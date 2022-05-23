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

      const name = profileInfo.name || '';
      const bio = profileInfo.bio || '';
      let avatar = 'https://infura-ipfs.io/ipfs/QmcK8FSTtLQVydLEDKLv1hEacLxZgi7j2i4mkQQMyKxv6k';
      
      if (profileInfo.avatar && profileInfo.avatar.length > 0) {
        const first = profileInfo.avatar[0] as string;
        if (first.startsWith('ipfs')) {
          avatar = 'https://infura-ipfs.io/ipfs/' + first.replace('ipfs://', '');
        }
      }

      const profile = { address, name, bio, avatar };
      dispatch({ type: 'set_rss3', rss3, profile });
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    const rss3 = new RSS3({ endpoint: RSS3_ENDPOINT_URL });
    dispatch({ type: 'set_rss3', rss3, profile: null });
  }, [dispatch]);

  return { ...state, authenticate, logout };
};
