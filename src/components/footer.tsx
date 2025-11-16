/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 12:10:19
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 14:54:33
 * @FilePath: src/components/footer.tsx
 * @Description: 页脚组件
 */
import IcpInfo from "@/components/icp-info";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by kurous</p>
        <IcpInfo />
      </aside>
    </footer>
  )
}

export default Footer;
