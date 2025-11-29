import { Select } from "antd";

type Props = {
    opciones: string[];
    valor?: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const SelectOpciones = ({ opciones, valor, onChange, placeholder }: Props) => (
    <Select
        showSearch
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        optionFilterProp="label"
        style={{ width: "100%" }}
        filterOption={(input, option) =>
            (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
        }
        options={opciones.map(o => ({ label: o, value: o }))}
    />
);

export default SelectOpciones;
