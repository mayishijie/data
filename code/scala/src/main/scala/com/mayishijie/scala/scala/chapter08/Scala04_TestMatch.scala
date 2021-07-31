package com.mayishijie.scala.scala.chapter08

/**
  * Author: Felix
  * Date: 2020/5/5
  * Desc: 匹配对象 （样例类）
  */

class User(var name:String,var age:Int){}

object User{
  //根据属性创建对象
  def apply(name: String,age: Int): User = new User(name,age)

  //根据对象获取对下属你的属性
  def unapply(user: User): Option[(String, Int)] ={
    if(user == null){
      return None
    }else{
      return Some(user.name,user.age)
    }
  }

}

object Scala04_TestMatch {
  def main(args: Array[String]): Unit = {
    //创建用户对象
    val jj: User = User("jingjing",18)

    //对对象进行模式匹配
    val res = jj match {
      case User("jingjing", 18) => "Yes"
      case _ => "No"
    }
    println(res)
  }
}
