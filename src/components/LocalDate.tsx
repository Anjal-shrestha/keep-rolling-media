'use client';

import { useState, useEffect } from 'react';

interface LocalDateProps {
  dateString: string;
  options: Intl.DateTimeFormatOptions;
}

export default function LocalDate({ dateString, options }: LocalDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setFormattedDate(new Date(dateString).toLocaleDateString('en-US', options));
  }, [dateString, options]);

  // Return the formatted date string, which will be empty on the server
  return <>{formattedDate}</>;
}