SELECT cron.unschedule('refresh-google-reviews-hourly');
SELECT cron.schedule('refresh-google-reviews-hourly','17 * * * *',$job$
  SELECT net.http_post(
    url := 'https://project--b4468682-e064-4db8-b78d-4d6abc44895c.lovable.app/api/public/hooks/refresh-reviews',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer f69e42bfbdcce847c2314d2c03e21a8f6f42cb17fff8bcfc6b07469289671da7'),
    body := '{}'::jsonb
  );
$job$);