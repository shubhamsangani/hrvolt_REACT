const GetYearOption = (e: number) => {

    let currentYear = new Date().getFullYear();
  
    const maxLen = e;
    const years = [];
  
    for (let i = 0; i < maxLen; i++) {
      years.push({ value: String(currentYear), label: String(currentYear) });
      currentYear--;
    }
    return years;
  };
  
  export default GetYearOption;