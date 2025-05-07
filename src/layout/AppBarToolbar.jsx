/*import { LoadingIndicator, LocalesMenuButton } from 'react-admin';*/
import { Select, MenuItem, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

/*import { ThemeSwapper } from '../themes/ThemeSwapper';*/

export const AppBarToolbar = () => {
  const [currentCompany, setCurrentCompany] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const companyList = JSON.parse(localStorage.getItem("companies") || "[]");
    setCompanies(companyList);
    setCurrentCompany(parseInt(localStorage.getItem('current_company')))

    const targetCompany = companyList.find(company => company.id ===  parseInt(localStorage.getItem('current_company')));
    const locale = targetCompany.region_type === "china" ? 'zh-cn' : 'zh-tw';
    localStorage.setItem('locale', locale);
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;

    localStorage.setItem('current_company', selectedId);
    setCurrentCompany(selectedId);

    const targetCompany = companies.find(company => company.id === selectedId);
    const locale = targetCompany.region_type === "china" ? 'zh-cn' : 'zh-tw';
    localStorage.setItem('locale', locale);

    window.location.reload();
  };

  return (
    <>
      <Select
        value={currentCompany}
        variant="standard"
        onChange={handleChange}
        sx={{ color: 'white', mr: 2 }}
        renderValue={(selected) => {
          const selectedCompany = companies.find(c => c.id === selected);
          return (
            <Box display="flex" alignItems="center">
              <Typography>{selectedCompany?.name}</Typography>
            </Box>
          );
        }}
      >
        {companies.map((company) => (
          <MenuItem key={company.id} value={company.id}>
            <Box display="flex"  alignItems="center" justifyContent="space-between" width="100%">
              <Typography color={currentCompany === company.id ? "primary" : ""}>{company.name}</Typography>
              {currentCompany === company.id && (
                <CheckCircleOutlineIcon fontSize="medium" color="primary" />
              )}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {/* <LoadingIndicator /> */}
      {/* <LocalesMenuButton /> */}
      {/* <ThemeSwapper /> */}
    </>
  )
};