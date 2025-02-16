import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';

const PowerBIReport = () => {
  const [embedToken, setEmbedToken] = useState('');

  // These should be your actual Power BI Report details
  const reportId = 'your-report-id';
  const groupId = 'your-group-id';

  useEffect(() => {
    // TODO: Fetch a new embed token from your backend API
    fetch('/api/getEmbedToken')
      .then(response => response.json())
      .then(data => setEmbedToken(data.token))
      .catch(error => console.error('Error fetching embed token:', error));
  }, []);

  const embedConfig = {
    type: 'report',
    tokenType: 'Embed',
    accessToken: embedToken,  // Now dynamically updated
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`,
    settings: {
      filterPaneEnabled: true,
      navContentPaneEnabled: true
    }
  };

  return (
    <div style={{ height: '600px' }}>
      {embedToken ? (
        <PowerBIEmbed embedConfig={embedConfig} />
      ) : (
        <p>Loading Power BI report...</p>
      )}
    </div>
  );
};

export default PowerBIReport;
