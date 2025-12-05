interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {icon}
        <div>
            <strong style={{ fontSize: "0.85rem", color: "#888" }}>{label}</strong>
            <div>{value}</div>
        </div>
    </div>
);

export default InfoItem;
