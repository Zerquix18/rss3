import { Profile } from "../models";

export function parseBio(bio: string) {
  const actualBio = bio.replace(/<[A-Z]+#.*>/g, '');
  let url = '';

  const specialThings = bio.match(/<[A-Z]+#.*>/g);
  if (specialThings) { // I clearly didn't know what to call this.
    const specialThing = specialThings[0].slice(1).slice(0, specialThings[0].length - 2);
    const [thing, value] = specialThing.split('#');
    if (thing === 'SITE') {
      url = value;
    }
  }

  return { actualBio, url };
}

export function getProfile(address: string, profileInfo: any) {
  const bioInfo = parseBio(profileInfo.bio);

  const { url } = bioInfo;
  const name = profileInfo.name || '';
  const bio = bioInfo.actualBio || '';
  let avatar = 'https://infura-ipfs.io/ipfs/QmcK8FSTtLQVydLEDKLv1hEacLxZgi7j2i4mkQQMyKxv6k';
  
  if (profileInfo.avatar && profileInfo.avatar.length > 0) {
    const first = profileInfo.avatar[0] as string;
    if (first.startsWith('ipfs')) {
      avatar = 'https://infura-ipfs.io/ipfs/' + first.replace('ipfs://', '');
    }
  }

  const profile: Profile = { address, name, bio, url, avatar };
  return profile;
}
