function CustomInput({ label, type, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
}

export default CustomInput;