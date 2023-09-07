import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { ProgressBar } from '../Elements/ProgressBar';

const icons = {
  info: <InformationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />,
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />,
  warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />,
  danger: <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />,
};

export type NotificationType = {
  id: string;
  type: keyof typeof icons;
  title: string;
  message?: string;
  duration?: number;
};

export type NotificationProps = {
  notification: NotificationType;
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message, duration },
  onDismiss,
}: NotificationProps) => {
  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-start">
      <Transition
        appear
        show={true}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4" role="alert" aria-label={title}>
            <div className="flex items-start">
              <div className="flex-shrink-0">{icons[type]}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  className="inline-flex bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    onDismiss(id);
                  }}
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {duration ? <ProgressBar duration={duration} reverse={true} variant={type} /> : null}
        </div>
      </Transition>
    </div>
  );
};
