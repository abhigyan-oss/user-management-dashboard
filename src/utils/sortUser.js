export function sortUsers(users, sortConfig) {
    if (!sortConfig.key) return users;
  
    const sortedUsers = [...users].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
  
      if (typeof valueA === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
  
      return sortConfig.direction === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });
  
    return sortedUsers;
  }