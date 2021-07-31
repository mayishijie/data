package com.mayishijie.scala.scala.chapter06

/**
  * Author: Felix
  * Date: 2020/4/30
  * Desc: 特质叠加  解决特质冲突(钻石问题)
  */
object Scala20_TestTrait {
  def main(args: Array[String]): Unit = {
    val mo = new MyOperation
    println(mo.describe())
  }
}

trait Operation{
  def describe(): String ={
    "插入数据"
  }
}

trait DBOperation extends Operation{
  override def describe(): String = {
    "向MySQL数据库中" + super.describe()
  }
}

trait HDFSOperation extends Operation{
  override def describe(): String = {
    "向HDFS中" + super.describe()
  }
}

class MyOperation extends HDFSOperation with DBOperation{
  override def describe(): String = {
    "我的操作是-->" + super.describe()
  }
}

