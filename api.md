
## API 接口文档

### 1. 获取课程列表

**接口路径:** `/api/courses`  
**请求方式:** GET

**请求参数:**
```typescript
{
  type?: string;    // 可选，课程类型
  page?: number;    // 可选，页码，默认值: 1
  pageSize?: number; // 可选，每页数量，默认值: 10
}
```

**课程类型枚举:**
- 中创网
- 福源论坛
- 冒泡网
- 自学成才网

**返回结构:**
```typescript
{
  code: number;     // 状态码，0 表示成功
  message?: string; // 错误信息，仅在失败时返回
  result?: {
    list: Array<{
      pageId: number;      // 课程ID
      type: string;        // 课程类型
      title: string;       // 课程标题
      desc: string;        // 课程描述
      imgUrl: string;      // 课程图片
      publishTime: string; // 发布时间
      link: string;        // 课程链接
    }>;
    total: number;    // 总记录数
    page: number;     // 当前页码
    pageSize: number; // 每页数量
  }
}
```

### 2. 获取课程详情

**接口路径:** `/api/courses/:pageId`  
**请求方式:** GET

**请求参数:**
```typescript
{
  pageId: number;  // 必填，课程ID（路径参数）
}
```

**返回结构:**
```typescript
{
  code: number;     // 状态码，0 表示成功
  message?: string; // 错误信息，仅在失败时返回
  result?: {
    pageId: number;      // 课程ID
    type: string;        // 课程类型
    title: string;       // 课程标题
    desc: string;        // 课程描述
    imgUrl: string;      // 课程图片
    publishTime: string; // 发布时间
    link: string;        // 课程链接
    detailInfo: string;  // 课程详细信息
    downloadLink: string; // 下载链接
  }
}
```
