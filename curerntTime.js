function getCurrentDateTime() {
    const currentDate = new Date();
    // Extract date components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear().toString().slice(-2);
    // Extract time components
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
    // Format time with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    // Construct the formatted date and time string
    const formattedDateTime = `${day}-${month}-${year} ${formattedHours}：${formattedMinutes} ${ampm}`;
    return formattedDateTime;
  }