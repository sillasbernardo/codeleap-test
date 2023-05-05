export const getTime = (createdDate: string) => {
  const postDate = new Date(createdDate);
  const now = new Date();

  // Calculate minutes
  const timeDifference = now.getTime() - postDate.getTime();
  const createdDateMinutes = Math.floor(timeDifference / (1000 * 60));

  // Calculate hours
  if (createdDateMinutes >= 60){
    const hours = Math.floor(createdDateMinutes / 60);

    if (hours === 1){
      return `${hours} hour ago`;
    }

    return `${hours} hours ago`;
  } else {
    if (createdDateMinutes === 1){
      return `${createdDateMinutes} minute ago`
    }

    return `${createdDateMinutes} minutes ago`
  }
};
