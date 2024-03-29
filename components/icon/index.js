import React from "react";
import {
  FiVolume2,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
  FiUploadCloud,
  FiCalendar,
  FiHardDrive,
  FiUser,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import { AiOutlineCheckCircle,AiOutlineCloseCircle,AiOutlineClockCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

export const InfoIcon = props => <FiVolume2 {...props} />;
export const LoadingIcon = props => <FiLoader {...props} />;
export const SuccessIcon = props => <FiCheckCircle {...props} />;
export const ErrorIcon = props => <FiXCircle {...props} />;
export const WarningIcon = props => <FiAlertCircle {...props} />;
export const CloseIcon = props => <FiX {...props} />;
export const UpIcon = props => <FiChevronUp {...props} />;
export const DownIcon = props => <FiChevronDown {...props} />;
export const ArrowRightIcon = props => <FiChevronRight {...props} />;
export const ArrowLeftIcon = props => <FiChevronLeft {...props} />;
export const FileUploadIcon = props => <FiUploadCloud {...props} />;
export const CalendarIcon = props => <FiCalendar {...props} />;
export const CloseCircleIcon = props => <IoMdCloseCircle {...props} />;
export const EmptyIcon = props => <FiHardDrive {...props} />;
export const UserIcon = props => <FiUser {...props} />;
export const PasswordShowIcon = props => <FiEye {...props} />;
export const PasswordHideIcon = props => <FiEyeOff {...props} />;
export {AiOutlineCheckCircle, AiOutlineCloseCircle,AiOutlineClockCircle}