using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlTypes;
using System.Data.SqlClient;
using System.IO;


namespace DS
{
    public partial class PhotoView : System.Web.UI.Page
    {
        eDS e1 = new eDS();
        protected void Page_Load(object sender, EventArgs e)
        {
            e1.OpenConn();
            string strQuery = "select vname as Name,bImage as Data,vimage as ContentType from storeObjects..EmpPhoto where nEmp_id=" + Request["id"];
            DataTable dt = new DataTable();
            dt = e1.ExecDT(strQuery);
            if (dt != null)
            {
                try
                {
                    Byte[] bytes = (Byte[])dt.Rows[0]["Data"];
                    Response.Buffer = true;
                    Response.Charset = "";
                    Response.Cache.SetCacheability(HttpCacheability.NoCache);
                    Response.ContentType = dt.Rows[0]["ContentType"].ToString();
                    Response.AddHeader("content-disposition", "attachment;filename="
                        + dt.Rows[0]["Name"].ToString());
                    Response.BinaryWrite(bytes);
                    Response.Flush();
                    //Response.End();
                }
                catch (Exception ee) { }

            }
            e1.Closeconn();
        }
    }
}