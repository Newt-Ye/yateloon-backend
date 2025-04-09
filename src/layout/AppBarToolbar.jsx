import { LoadingIndicator/*, LocalesMenuButton*/ } from 'react-admin';
import { Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

/*import { ThemeSwapper } from '../themes/ThemeSwapper';*/

export const AppBarToolbar = () => {
  const [currentCompany, setCurrentCompany] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const companyList = JSON.parse(localStorage.getItem("companies") || "[]");
    setCompanies(companyList);
    setCurrentCompany(localStorage.getItem('current_company'))
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;

    localStorage.setItem('current_company', selectedId);
    setCurrentCompany(selectedId);

    window.location.reload();
  };

  return (
    <>
      <Select
        value={currentCompany}
        variant="standard"
        onChange={handleChange}
        sx={{ color: 'white', mr: 2 }}
      >
        {companies.map((company) => (
          <MenuItem key={company.id} value={company.id}>
            {company.name}
          </MenuItem>
        ))}
      </Select>
      {/* <LocalesMenuButton /> */}
      {/* <ThemeSwapper /> */}
      <LoadingIndicator />
    </>
  )
};