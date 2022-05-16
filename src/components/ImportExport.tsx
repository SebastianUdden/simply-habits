import { useState } from "react";
import styled from "styled-components";
import { cloudDownload } from "../icons/cloud-download";
import { cloudUpload } from "../icons/cloud-upload";
import Icon from "../icons/Icon";
import { exportData, importData } from "../utils";

const ImportExport = () => {
  const [showImport, setShowImport] = useState(false);
  return (
    <Wrapper>
      <Title>Data handling</Title>
      <p>
        Pass data between devices and/or make backups using the export/import
        functionality.
      </p>
      <Button onClick={() => exportData("simply-habits")}>
        <Icon {...cloudUpload} />
        <span>Export</span>
      </Button>
      <div id="export" />
      {showImport ? (
        <Input
          type="file"
          id="input"
          onChange={(e) => importData("simply-habits", e)}
        />
      ) : (
        <Button onClick={() => setShowImport(true)}>
          <Icon {...cloudDownload} />
          <span>Import</span>
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  margin: 10px 0 0;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  border-radius: 6px;
  padding: 20px;
  font-size: 16px;
  background-color: ${(p) => p.theme.primaryVariant.bgColor};
  color: ${(p) => p.theme.primaryVariant.color};
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  span {
    margin-left: 10px;
    margin-bottom: -1px;
  }
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.5;
  }
  margin-bottom: 5px;
`;
const Input = styled.input`
  margin: 15px 0;
  font-size: 16px;
`;

export default ImportExport;
