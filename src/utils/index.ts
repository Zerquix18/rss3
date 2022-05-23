export function parseBio(bio: string) {
  const actualBio = bio.replace(/<[A-Z]+\#.*>/g, '');
  let url = '';

  const specialThings = bio.match(/<[A-Z]+\#.*>/g);
  if (specialThings) { // I clearly didn't know what to call this.
    const specialThing = specialThings[0].slice(1).slice(0, specialThings[0].length - 2);
    const [thing, value] = specialThing.split('#');
    if (thing === 'SITE') {
      url = value;
    }
  }

  return { actualBio, url };
}
