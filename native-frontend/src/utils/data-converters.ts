export const convertFlagIntoPng = (svgUrl: string) => {
    const flagName = svgUrl.split('/')?.pop()?.split('.')[0];
    const rest = svgUrl.split('/')?.slice(0, -1).join('/');
    return `${rest}/w320/${flagName}.png`;
}