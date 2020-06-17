import { Radio } from 'antd';
import { getLocale, setLocale, useIntl } from 'umi';

export default () => {
  const intl = useIntl();
  return (
    <>
    <label className="lang-label">{intl.formatMessage({ id: 'changeLng' })}</label>
        <Radio.Group className="lang-wrapper" defaultValue={getLocale()} onChange={ e => setLocale(e.target.value, false)}>
            <Radio.Button value="zh_CN">中文</Radio.Button>
            <Radio.Button value="en_US">English</Radio.Button>
            <Radio.Button value="ja_JP">日本語</Radio.Button>
        </Radio.Group>
    </>
  )
}
