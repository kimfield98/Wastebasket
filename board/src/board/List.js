import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../App.css';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const TableHead = styled.thead`
  background: #333;
  color: white;
`;

const TableRow = styled.tr`
  height: 40px;
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 18px 12px;
`;

const HeaderCell = styled(TableCell)`
  font-weight: bold;
`;

const List = ({ list }) => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>No</HeaderCell>
            <HeaderCell>제목</HeaderCell>
            <HeaderCell>글쓴이</HeaderCell>
            <HeaderCell>날짜</HeaderCell>
          </TableRow>
        </TableHead>
        <tbody>
          {list.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                <Link to={`/view/${item.id}`}>{item.subject}</Link>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <hr />
      <div className="btncover">
        <button className="btn" onClick={() => navigate('/write')}>WRITE</button>
      </div>
    </div>
  );
};

export default List;
