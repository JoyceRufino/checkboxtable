import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import "./TableComponent.css";


interface DataItem {
  id: number;
  parametro: string;
  nivel: string;
  unidade: string;
  potencial: string | number;
}

interface Option {
  value: string;
  label: string;
}

const TableComponent: React.FC = () => {
  const initialData: DataItem[] = [
    { id: 15814, parametro: "Este é o primeiro parâmetro", nivel: "teste", unidade: 'porcentagem', potencial: '10%' },
    { id: 84362, parametro: "Este é o segundo parâmetro", nivel: "mensagem", unidade: 'contagem', potencial: 6 },
    { id: 58933, parametro: "Este é o terceiro parâmetro", nivel: "feedback" , unidade: 'tempominuto', potencial: '2 minutos'},
    { id: 58934, parametro: "Este é o quarto parâmetro", nivel: "teste", unidade: 'tempohora', potencial: '2 horas' },
  ];

  const optionsSelectedNivel: Option[] = [
    { value: "teste", label: "A label de um teste" },
    { value: "mensagem", label: "A label de uma mensagem" },
    { value: "feedback", label: "A label de um feedback" },
  ];

  const valuesFromApi: DataItem[] = [
    { id: 15814, parametro: "Este é o primeiro parâmetro", nivel: "teste" , unidade: 'tempominuto', potencial: '56 minutos'},
    { id: 58934, parametro: "Este é o quarto parâmetro", nivel: "teste",  unidade: 'porcentagem', potencial: '50%' },
  ];

  // Estado para os dados da tabela
  const [tableData, setTableData] = useState<DataItem[]>(initialData);
  // Estado para os itens selecionados (objetos completos)
  const [selectedItems, setSelectedItems] = useState<DataItem[]>(
    valuesFromApi
  );

  // Função para alternar o checkbox
  const handleCheckboxChange = (item: DataItem) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.some((selectedItem) => selectedItem.id === item.id)
        ? prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prevSelectedItems, item]
    );
  };

  // Função para atualizar o nível selecionado
  const handleSelectChange = (id: number, newNivel: string) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, nivel: newNivel } : item
      )
    );
  };

  const handleSave = () => {
    const savedData = {
      selectedItems,
      tableData
    };
    console.log("Dados Salvos:", savedData);
  };

  return (
    <div className="table-container">
      <Table className="custom-table" hover responsive>
        <thead className="thead-light">
          <tr>
            <th>Opções</th>
            <th>Parâmetros</th>
            <th>Nível</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                  onChange={() => handleCheckboxChange(item)}
                />
              </td>
              <td>{item.parametro}</td>
              <td>
                <select
                  value={item.nivel}
                  onChange={(e) =>
                    handleSelectChange(item.id, e.target.value)
                  }
                >
                  {optionsSelectedNivel.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td>{item.unidade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="primary" onClick={handleSave}>
        Salvar
      </Button>
    </div>
  );
};

export default TableComponent;
