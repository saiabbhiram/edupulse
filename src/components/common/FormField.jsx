import React from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  rows = 3,
  className = '',
  disabled = false,
  helpText,
  ...props
}) => {
  const baseInputStyles = `w-full rounded-xl px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 dark:disabled:bg-slate-900/50 disabled:cursor-not-allowed ${
    error
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-900/40'
      : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-100 dark:focus:ring-indigo-900/30'
  }`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`${baseInputStyles} cursor-pointer`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputStyles}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputStyles}
          {...props}
        />
      )}

      {error && (
        <p className="text-xs text-rose-500 dark:text-rose-400 mt-1">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default FormField;
