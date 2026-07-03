function FilterModal({ department, setDepartment }) {
    return (
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="filter-select"
      >
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
      </select>
    );
  }
  
  export default FilterModal;