import { Font } from 'expo';

const cacheFonts = (fonts) => {
  return (fonts.map(font => Font.loadAsync(font)));
}

export default async function loadAssetsAsync () {
  const fontAssets = cacheFonts([
    {'fontawesome': require('./../assets/fonts/fontawesome.ttf')},
    {'icomoon': require('./../assets/fonts/icomoon.ttf')},
    {'Righteous-Regular': require('./../assets/fonts/Righteous-Regular.ttf')},
    {'Roboto-Bold': require('./../assets/fonts/Roboto-Bold.ttf')},
    {'Roboto-Light': require('./../assets/fonts/Roboto-Light.ttf')},
    {'Roboto-Medium': require('./../assets/fonts/Roboto-Medium.ttf')},
    {'Roboto-Regular': require('./../assets/fonts/Roboto-Regular.ttf')},
  ]);

  await Promise.all(fontAssets);
}
