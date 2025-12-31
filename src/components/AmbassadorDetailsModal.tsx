import { useState } from "react";
import {
  X,
  ShieldAlert,
  CheckCircle2,
  RefreshCcw,
  Trash2,
  Send,
  Building2,
  Calendar,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Input from "./Input";
import { cn } from "../utils/cn";
import axiosInstance from "../api/axiosInstance";

interface AmbassadorDetailsModalProps {
  ambassador: any;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => Promise<void>;
  onForceReset: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const AmbassadorDetailsModal = ({
  ambassador,
  isOpen,
  onClose,
  onStatusUpdate,
  onForceReset,
  onDelete,
}: AmbassadorDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "message">("details");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  if (!ambassador) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await axiosInstance.post("/admin/messages", {
        recipientId: ambassador._id,
        subject: messageSubject,
        message: messageBody,
        type: "MESSAGE",
      });
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setMessageSubject("");
        setMessageBody("");
        setActiveTab("details");
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteClick = () => {
    if (
      confirm(
        `Are you sure you want to PERMANENTLY DELETE ${ambassador.firstName} ${ambassador.lastName}? This action cannot be undone.`
      )
    ) {
      onDelete(ambassador._id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex justify-between items-start bg-neutral-50/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                  {ambassador.firstName?.[0]}
                  {ambassador.lastName?.[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {ambassador.firstName} {ambassador.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        ambassador.accountStatus === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : ambassador.accountStatus === "SUSPENDED"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {ambassador.accountStatus}
                    </span>
                    <span className="text-xs text-neutral-500">
                      • {ambassador.email}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-100 px-6 bg-white">
              <button
                onClick={() => setActiveTab("details")}
                className={cn(
                  "px-4 py-3 text-sm font-bold border-b-2 transition-colors",
                  activeTab === "details"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                )}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("message")}
                className={cn(
                  "px-4 py-3 text-sm font-bold border-b-2 transition-colors",
                  activeTab === "message"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                )}
              >
                Send Message
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === "details" ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                      <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Building2 size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          University
                        </span>
                      </div>
                      <p className="font-semibold text-neutral-900">
                        {ambassador.university || "Not specified"}
                      </p>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                      <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <Calendar size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Joined Date
                        </span>
                      </div>
                      <p className="font-semibold text-neutral-900">
                        {new Date(ambassador.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                      <div className="flex items-center gap-2 text-neutral-400 mb-2">
                        <User size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Role
                        </span>
                      </div>
                      <p className="font-semibold text-neutral-900">
                        {ambassador.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">
                      Account Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ambassador.accountStatus === "ACTIVE" ? (
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 justify-start"
                          onClick={() =>
                            onStatusUpdate(ambassador._id, "SUSPENDED")
                          }
                        >
                          <ShieldAlert size={16} className="mr-2" /> Suspend
                          Account
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200 justify-start"
                          onClick={() =>
                            onStatusUpdate(ambassador._id, "ACTIVE")
                          }
                        >
                          <CheckCircle2 size={16} className="mr-2" /> Activate
                          Account
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        className="bg-white hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 justify-start"
                        onClick={() => onForceReset(ambassador._id)}
                      >
                        <RefreshCcw size={16} className="mr-2" /> Force Password
                        Reset
                      </Button>

                      <Button
                        variant="outline"
                        className="bg-white text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 justify-start col-span-1 sm:col-span-2 mt-2"
                        onClick={handleDeleteClick}
                      >
                        <Trash2 size={16} className="mr-2" /> Delete Ambassador
                        Permanently
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  {sendSuccess ? (
                    <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-100 text-green-800">
                      <CheckCircle2
                        size={32}
                        className="mx-auto mb-2 text-green-500"
                      />
                      <h3 className="font-bold">Message Sent!</h3>
                      <p className="text-sm mt-1">
                        Your message has been delivered to the ambassador's
                        inbox.
                      </p>
                    </div>
                  ) : (
                    <>
                      <Input
                        label="Subject"
                        placeholder="Regarding your recent task..."
                        required
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                      />
                      <div className="space-y-1.5">
                        <label className="block text-sm font-bold text-neutral-700">
                          Message
                        </label>
                        <textarea
                          className="w-full min-h-[150px] px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                          placeholder="Write your message here..."
                          required
                          value={messageBody}
                          onChange={(e) => setMessageBody(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button
                          type="submit"
                          isLoading={isSending}
                          className="pl-6 pr-6"
                        >
                          <Send size={16} className="mr-2" /> Send Message
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AmbassadorDetailsModal;
