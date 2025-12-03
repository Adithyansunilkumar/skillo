import React from "react";

export default function DisclaimerPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-3 text-xl font-bold text-purple-700">
          Event Disclaimer
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            The event starts at <strong>2:00 PM</strong> and ends at{" "}
            <strong>4:00 PM</strong>.
          </li>
          <li>
            Your total score will reset to <strong>zero</strong> when the event
            begins.
          </li>
          <li>The registered email must belong to you.</li>
          <li>Please use an email address that includes your real name.</li>
          <li>
            Accounts using inappropriate, offensive, or misleading email
            addresses will be removed.
          </li>
          <li>
            Any attempt to create multiple accounts or abuse the system will
            result in disqualification.
          </li>
          <li>The winner will be contacted through their registered email.</li>
        </ul>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white shadow-md transition hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
