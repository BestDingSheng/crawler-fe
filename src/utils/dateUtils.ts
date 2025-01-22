export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) {
    return '未知时间';
  }

  const date = new Date(dateString);
  
  // 检查是否是有效日期
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return '未知时间';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // 小于1分钟
  if (diffInSeconds < 60) {
    return '刚刚';
  }
  
  // 小于1小时
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}分钟前`;
  }
  
  // 小于1天
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}小时前`;
  }
  
  // 显示天数
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}天前`;
  }
  
  // 超过30天显示具体日期
  try {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '未知时间';
  }
} 