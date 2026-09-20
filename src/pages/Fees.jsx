import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { feeService, studentService, settingService } from '../services/storageService';
import { CreditCard, Printer, CheckCircle2, DollarSign, Calendar, School, ArrowUpRight } from 'lucide-react';

const Fees = () => {
  const toast = useToast();
  const [fees, setFees] = useState(() => feeService.getAll());
  const students = studentService.getAll();
  const settings = settingService.get();

  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const refresh = () => setFees(feeService.getAll());

  // Metrics
  const totalInvoiced = fees.reduce((acc, f) => acc + (f.amount || 0), 0);
  const totalCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalPending = Math.max(0, totalInvoiced - totalCollected);

  const handleOpenCollect = (fee) => {
    setSelectedFee(fee);
    const balance = Math.max(0, (fee.amount || 0) - (fee.paidAmount || 0));
    setPaymentAmount(balance.toString());
    setPaymentMethod('Credit Card');
    setIsCollectModalOpen(true);
  };

  const handleOpenReceipt = (fee) => {
    setSelectedFee(fee);
    setIsReceiptModalOpen(true);
  };

  const handleCollectPayment = (e) => {
    e.preventDefault();
    if (!paymentAmount || Number(paymentAmount) <= 0) {
      toast.error('Please enter a valid payment amount', 'Invalid Amount');
      return;
    }

    feeService.collectPayment(selectedFee.id, Number(paymentAmount), paymentMethod);
    refresh();
    setIsCollectModalOpen(false);
    toast.success(`Payment of $${paymentAmount} collected for ${selectedFee.studentName}`, 'Payment Recorded');
  };

  const columns = [
    {
      header: 'Invoice # & Student',
      accessor: 'studentName',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">
            {row.studentName}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {row.invoiceNo} • {row.className}
          </span>
        </div>
      )
    },
    {
      header: 'Fee Type',
      accessor: 'feeType',
      render: (row) => <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{row.feeType}</span>
    },
    {
      header: 'Amount / Paid',
      accessor: 'amount',
      render: (row) => (
        <div>
          <span className="font-extrabold text-slate-900 dark:text-white block text-xs">
            ${row.amount}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            Paid: ${row.paidAmount || 0}
          </span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {row.dueDate}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant={row.status} dot>{row.status}</Badge>
    },
    {
      header: 'Actions',
      accessor: 'id',
      sortable: false,
      hideFromExport: true,
      className: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          {row.status !== 'Paid' ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenCollect(row)}
              className="text-xs px-2.5 py-1"
            >
              Collect
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenReceipt(row)}
              icon={Printer}
              className="text-xs px-2.5 py-1"
            >
              Receipt
            </Button>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Overdue', label: 'Overdue' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fee Management & Invoices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor tuition collections, process payments, and issue official school receipts
          </p>
        </div>
      </div>

      {/* Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invoiced</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
            ${totalInvoiced.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{fees.length} active invoices issued</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/70 dark:border-emerald-900/50 shadow-sm bg-emerald-50/20">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Total Collected</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1.5">
            ${totalCollected.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {Math.round((totalCollected / (totalInvoiced || 1)) * 100)}% collection efficiency
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/70 dark:border-rose-900/50 shadow-sm bg-rose-50/20">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Total Outstanding</span>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1.5">
            ${totalPending.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Pending and overdue fees</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={fees}
        searchPlaceholder="Search invoices by student name, roll, or ID..."
        filterOptions={filterOptions}
        exportFilename="fees-invoices.csv"
      />

      {/* Collect Fee Modal */}
      <Modal
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        title="Collect Fee Payment"
        subtitle={`Invoice #${selectedFee?.invoiceNo} • ${selectedFee?.studentName}`}
        size="md"
      >
        {selectedFee && (
          <form onSubmit={handleCollectPayment} className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Student:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedFee.studentName} ({selectedFee.className})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee Category:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedFee.feeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Invoiced:</span>
                <span className="font-bold text-slate-900 dark:text-white">${selectedFee.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Previously Paid:</span>
                <span className="font-bold text-emerald-600">${selectedFee.paidAmount || 0}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-extrabold">
                <span className="text-slate-800 dark:text-slate-200">Balance Remaining:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  ${Math.max(0, selectedFee.amount - (selectedFee.paidAmount || 0))}
                </span>
              </div>
            </div>

            <FormField
              label="Amount to Pay ($)"
              name="paymentAmount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="e.g. 600"
              required
            />

            <FormField
              label="Payment Method"
              name="paymentMethod"
              type="select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash', 'Cheque']}
              required
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setIsCollectModalOpen(false)}>Cancel</Button>
              <Button type="submit">Confirm & Process Payment</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Official Receipt Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        title="Fee Payment Receipt"
        size="md"
      >
        {selectedFee && (
          <div className="space-y-5">
            <div id="printable-report" className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-xs">
              <div className="text-center border-b pb-4 mb-4 border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow mb-1">
                  <School className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm uppercase text-slate-900 dark:text-white">
                  {settings?.schoolProfile?.schoolName || 'EduPulse Academy of Excellence'}
                </h4>
                <p className="text-[11px] text-slate-400">Official Payment Acknowledgement Receipt</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Receipt No:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{selectedFee.invoiceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Paid:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFee.paymentDate || '2026-09-18'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedFee.studentName} ({selectedFee.className})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fee Particulars:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{selectedFee.feeType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Mode:</span>
                  <span className="text-slate-800 dark:text-slate-200">{selectedFee.paymentMethod || 'Credit Card'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-700 text-sm font-extrabold">
                  <span className="text-slate-900 dark:text-white">Total Paid:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">${selectedFee.paidAmount || selectedFee.amount}</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-end border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                <span>Authorized Cashier / Bursar</span>
                <span className="font-mono">STATUS: PAID IN FULL</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReceiptModalOpen(false)}>Close</Button>
              <Button onClick={() => window.print()} icon={Printer}>Print Receipt</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Fees;
