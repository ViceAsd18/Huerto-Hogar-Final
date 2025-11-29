import { InputNumber } from "antd";

interface Props {
    valor : number;
    onChange?: (valor: number) => void;
    min? : number;
    max? : number;
}

const InputNumero = ({ valor, onChange, min = 1, max }: Props) => {
    return (
        <InputNumber 
            value={valor} 
            onChange={(v) => onChange?.(v ?? 0)} 
            min={min} 
            max={max}>
        </InputNumber>
    )
}

export default InputNumero;