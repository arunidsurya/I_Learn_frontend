export const formatCreatedAt = (createdAt: any) => {
  const date = new Date(createdAt);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60 && minutes>0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }else if(minutes === 0){
    return `just now`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

export const formatDate =(dateString: string)=>{
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return `${day}-${months[monthIndex]}-${year}`;
}